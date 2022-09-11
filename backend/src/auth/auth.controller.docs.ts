import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthResponseDto } from "./dto-out/auth-response.dto";

function DocsLogin() {
    return applyDecorators(
        ApiOperation({
            description: 'Logins using the provided email and password. The user with the email must exist and the passwords must match.',
            summary: 'Login as a user.'
        }),
        ApiResponse({ type: AuthResponseDto })
    );
}

function DocsRegister() {
    return applyDecorators(
        ApiOperation({
            description: 'Registers a new user along with the provided data. The email has to be valid and unique.',
            summary: 'Registers a new user.'
        }),
        ApiOkResponse({ type: AuthResponseDto })
    );
}

export {
    DocsLogin,
    DocsRegister
}