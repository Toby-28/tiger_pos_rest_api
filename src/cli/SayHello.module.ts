import { Module } from '@nestjs/common';
import { SayHelloCommand } from './SayHello.cli';

@Module({ providers: [SayHelloCommand], exports: [SayHelloCommand] })
export class SayHelloModule {}
