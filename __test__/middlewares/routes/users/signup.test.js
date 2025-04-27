const signup = require('../../../../middlewares/routes/users/signup');
const User = require('../../../../services/schemas/users');
const { getUser } = require('../../../../repositories/users');
const { createDefaultAvatar } = require('../../../../utils/avatars');

jest.mock('../../../../repositories/users', () => ({
  getUser: jest.fn(),
}));

jest.mock('../../../../utils/avatars', () => ({
  createDefaultAvatar: jest.fn(),
}));

jest.mock('../../../../services/schemas/users', () => {
  return jest.fn().mockImplementation(function({ email, avatarURL }) {
    this.email = email;
    this.avatarURL = avatarURL;
    this.setHashedPassword = jest.fn().mockResolvedValue(true);
    this.save = jest.fn().mockResolvedValue(true);
  });
});

describe('signup middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 409 when email is already in use', async () => {
    getUser.mockResolvedValue({ id: 1, email: 'test@example.com' });

    await signup(req, res, next);

    expect(getUser).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email in use' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should create a new user when email is not in use', async () => {
    getUser.mockResolvedValue(null);
    createDefaultAvatar.mockReturnValue('avatar-url');

    await signup(req, res, next);

    expect(getUser).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(createDefaultAvatar).toHaveBeenCalledWith('test@example.com');

    expect(User).toHaveBeenCalledWith({
      email: 'test@example.com',
      avatarURL: 'avatar-url',
    });

    const userInstance = User.mock.instances[0];
    expect(userInstance.setHashedPassword).toHaveBeenCalledWith('password123');
    expect(userInstance.save).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User created' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with error when an exception occurs', async () => {
    const error = new Error('Database error');
    getUser.mockRejectedValue(error);

    await signup(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
