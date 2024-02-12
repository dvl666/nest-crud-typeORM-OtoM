import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflecfor: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {

    const roles = this.reflecfor.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass()
    ])

    console.log(roles);

    return true;
  }
}
