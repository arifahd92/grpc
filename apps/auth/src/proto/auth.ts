/**
* This file is auto-generated by nestjs-proto-gen-ts
*/

import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export namespace auth {
    export interface AdminService {
        signIn(
            data: User,
            metadata?: Metadata,
            ...rest: any[]
        ): Observable<Token>;
        verify(
            data: Token,
            metadata?: Metadata,
            ...rest: any[]
        ): Observable<Status>;
    }
    export interface User {
        id?: number;
        username?: string;
        password?: string;
        role?: string;
    }
    export interface Token {
        token?: string;
    }
    export interface Status {
        value?: boolean;
        role?: string;
    }
}
