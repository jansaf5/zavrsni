import { applyDecorators } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Favourite } from "./dto-out/favourite.dto";

function DocsAddFavourite() {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            description: 'Adds a new favourite into the database in case it\'s unique and connects it to the user making the request. Otherwise it\'s immediately connected to the user making the reqest.',
            summary: 'Adds a new favourite for the user making the request.'
        }),
        ApiResponse({ type: Boolean }),
        ApiUnauthorizedResponse(),
        ApiBadRequestResponse()
    );
}

function DocsRemoveFavourite() {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            description: 'Removes entries from the database with the forwarded favourite name and from the user making the request.',
            summary: 'Removes the forwarded favourite for the user making the request.'
        }),
        ApiOkResponse({ type: Boolean }),
        ApiUnauthorizedResponse()
    );
}

function DocsGetFavourites() {
    return applyDecorators(
        ApiBearerAuth(),
        ApiOperation({
            description: 'Returns the favourites from the user making the request.',
            summary: 'Returns the favourites from the user making the request.'
        }),
        ApiOkResponse({
            isArray: true,
            type: Favourite
        }),
        ApiUnauthorizedResponse()
    );
}

export {
    DocsAddFavourite,
    DocsRemoveFavourite,
    DocsGetFavourites
}