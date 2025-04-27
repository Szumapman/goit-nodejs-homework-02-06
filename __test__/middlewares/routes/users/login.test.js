const login = require('../../../../middlewares/routes/users/login');
const { getUser } = require('../../../../repositories/users');

beforeAll(() => {
  process.env.ACCESS_TOKEN_SECRET = 'dummy_secret';
});

jest.mock('../../../../repositories/users', () => ({
    getUser: jest.fn(),
}));

describe('login middleware', () => {
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

    it('should return 401 when email is wrong', async () => {
        getUser.mockResolvedValue(null);

        await login(req, res, next);

        expect(getUser).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Email or password is wrong' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 when password is wrong', async () => {
        const user = {
        _id: 1,
        email: 'test@example.com',
        subscription: 'starter',
        verifyPassword: jest.fn().mockResolvedValue(false),
        save: jest.fn(),
        };
        getUser.mockResolvedValue(user);

        await login(req, res, next);

        expect(getUser).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(user.verifyPassword).toHaveBeenCalledWith('password123');
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Email or password is wrong' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 200 when login is successful', async () => {
        const user = {
        _id: 1,
        email: 'test@example.com',
        subscription: 'starter',
        verifyPassword: jest.fn().mockResolvedValue(true),
        save: jest.fn().mockResolvedValue(true),
        };
        getUser.mockResolvedValue(user);

        await login(req, res, next);

        expect(getUser).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(user.verifyPassword).toHaveBeenCalledWith('password123');
        expect(user.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
        token: expect.any(String),
        user: { email: user.email, subscription: user.subscription },
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('should call next with error when an exception occurs', async () => {
        const error = new Error('Database error');
        getUser.mockRejectedValue(error);

        await login(req, res, next);    

        expect(next).toHaveBeenCalledWith(error);
    });
});
        