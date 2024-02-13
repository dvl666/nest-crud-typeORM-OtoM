import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorators';
import { Role } from '../../common/enums/rol.enum';
import { Admin } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {

    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    // console.log(role);

    if( !role ) {
      return true
    }

    const { user } = context.switchToHttp().getRequest();
    // console.log(user)

    if ( user.role === Role.ADMIN ) return true
    
    return role === user.role

  }
}
