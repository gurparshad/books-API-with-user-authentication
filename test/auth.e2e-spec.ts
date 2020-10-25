import { HttpStatus } from '@nestjs/common';
import 'dotenv/config';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import {AuthCredentialsDto} from '../src/auth/auth-credentials.dto';
import { MongooseModule } from '@nestjs/mongoose';

beforeAll(async () => {
    await mongoose.connect('mongodb+srv://gurparshad:Balbasor123@@cluster-c-for-t.wyg77.mongodb.net/<dbname>?retryWrites=true&w=majority');
});

afterAll(async done => {
    await mongoose.disconnect(done);
});

describe('USER', () => {
    const user: AuthCredentialsDto = {
        firstName: 'firstname',
        lastName: 'lastname',
        email: 'email',
        password: 'password',
        confirmPassword: 'confirmPassword'
    }

    it('should register user', () => {
        return request('http://localhost:3002')
        .get('/auth/register')
        .set('Accept','application/json')
        .send(user)
        .expect(({body}) => {
        expect(body.user.firstName).toEqual('firstName');
        expect(body.user.lastname).toEqual('lastName');
        expect(body.user.email).toEqual('email');
        expect(body.user.password).toEqual('password');
        expect(body.user.confirmPassword).toEqual('confirmPassword');
        })
        .expect(HttpStatus.CREATED);
    })
})