import { stadiumStub } from '../test/stubs/stadiums.stub';

export const StadiumService = jest.fn().mockReturnValue({
  getUserById: jest.fn().mockResolvedValue(stadiumStub()),
  getAllUsers: jest.fn().mockResolvedValue([stadiumStub()]),
  createUser: jest.fn().mockResolvedValue(stadiumStub()),
  deleteUser: jest.fn().mockResolvedValue(1),
});
