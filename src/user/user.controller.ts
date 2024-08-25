import { Controller, Post, Body, BadRequestException, HttpCode, HttpStatus, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/auth/signup')

  @HttpCode(HttpStatus.OK)
  async signUp(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('userName') userName: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try{
        if (!firstName || !lastName || !userName || !email || !password) {
            throw new BadRequestException('All fields are required');
          }
      
          await this.userService.signUp(firstName, lastName, userName, email, password);
          return { success: true, message: 'User registered successfully', status: HttpStatus.OK };
    }catch(error) {
        return { success: false, message: error.message, status: HttpStatus.BAD_REQUEST };
    }
    
  }

  @Post('/auth/signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {

    try {
        if (!email || !password) {
            throw new BadRequestException('Email and password are required');
          }
      
          await this.userService.signIn(email, password)
          return { success: true, message: 'Sign in successful', status: HttpStatus.OK };
    }catch(error) {
        return { success: false, message: error.message, status: HttpStatus.UNAUTHORIZED };
    }
    ;
  }


  //user profile information
  @Get('/profile/:id')

  @HttpCode(HttpStatus.OK)
  async getUserProfile(@Param('id') userId: string) {
      try {
          const profile = await this.userService.getUserProfile(userId);
          return { success: true, data: profile, status: HttpStatus.OK,
          };
      } catch (error) {
          return { success: false, message: error.message, status: HttpStatus.BAD_REQUEST };
      }
  }


}
