import { UsersModel } from "@/database/models"
import { ApiError } from "@/errors/api-error";
import { Hasher } from "@/utils/helpers";

type AuthServiceDeps = {
    usersModel: UsersModel;
    hasher: Hasher;
}

export class AuthService {
    private usersModel: UsersModel;
    private hasher: Hasher;

    constructor({ usersModel, hasher }: AuthServiceDeps) {
        this.usersModel = usersModel;
        this.hasher = hasher;
    }

    public async signUpUser(userData: { username: string, email: string, password: string }) {
        const usersAlreadyExists = await this.usersModel.getUserByEmail(userData.email);

        if(usersAlreadyExists){
            throw new ApiError(400, `user with email '${userData.email}' already exists`);
        };

        // Hash the password
        userData.password = await this.hasher.hash(userData.password);

        const result = await this.usersModel.insertUser(userData);

        return result;
    }
}
