import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDto): Promise<{
        email: string;
        created: Date;
    }>;
    signin(dto: AuthDto): Promise<{
        access_token: string;
    }>;
}
