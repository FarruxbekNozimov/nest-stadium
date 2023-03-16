import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/models/user.model';
import { getModelToken } from '@nestjs/sequelize';
import { userStub } from './stubs/stadium.stub';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { StadiumsService } from '../stadiums.service';
import { CreateStadiumDto } from "../dto/create-stadium.dto";

describe('Users service', () => {
  let stadiumService: StadiumsService;
  const mockUsersRepository = {
    create: jest.fn().mockImplementation(userStub),
    findOne: jest.fn().mockImplementation(userStub),
    findByPk: jest.fn().mockImplementation(userStub),
    findAll: jest.fn().mockImplementation(() => [userStub()]),
    destroy: jest.fn().mockImplementation(() => 1),
  };

  const mockRolesRepository = {
    findOne: jest.fn().mockImplementation((value) => 'ADMIN'),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
providers: [
        JwtService,
        {
          provide: getModelToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(stadiumService).toBeDefined();
  });

  describe('Create User', () => {
    describe('When createUser is called', () => {
      let CreateStadiumDto: CreateStadiumDto;
      let newStadium:;
      beforeEach(async () => {
        createStadiumDto = {};
        newUser = await stadiumService.createStadium(CreateStadiumDto);
      });

      it('should be create new user', async () => {
        expect(await stadiumService.createStadium(CreateStadiumDto)).toEqual({
          ...userStub(),
          roles: ['ADMIN'],
        });
      });
    });
  });

  describe('getOneUser', () => {
    describe('when getOneUser is called', () => {
      test('then it should call userService', async () => {
        expect(await stadiumService.getUserById(userStub().id)).toEqual(
          userStub(),
        );
      });
    });
  });

  describe('getAllUsers', () => {
    describe('when getAllUsers is called', () => {
      test('then it should call stadiumService', async () => {
        expect(await stadiumService.getAllUsers()).toEqual([userStub()]);
      });
    });
  });

  describe('deleteUser', () => {
    describe('when deleteUser is called', () => {
      test('then it should call stadiumService', async () => {
        expect(await stadiumService.deleteUser(userStub().id)).toEqual(1);
      });
    });
  });

  describe('activateUser', () => {
    describe('when activateUser is called', () => {
      test('then it should call stadiumService', async () => {
        expect(
          await stadiumService.activateUser({ userId: userStub().id }),
        ).toEqual({ ...userStub(), is_active: true });
      });
    });
  });
});
