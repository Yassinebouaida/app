import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './dto/auth.input';
import { AuthResponse } from './dto/auth.response';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    register(registerInput: RegisterInput): Promise<AuthResponse>;
    login(loginInput: LoginInput): Promise<AuthResponse>;
}
