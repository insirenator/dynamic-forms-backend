import { UsersModel } from "@/database/models"
import { ApiError } from "@/errors/api-error";

type AuthServiceDeps = {
    usersModel: UsersModel
}

export class AuthService {
    private usersModel: UsersModel;

    constructor({ usersModel }: AuthServiceDeps) {
        this.usersModel = usersModel;
    }

    public async signUpUser(userData: { username: string, email: string, password: string }) {
        const usersAlreadyExists = await this.usersModel.getUserByEmail(userData.email);

        if(usersAlreadyExists){
            throw new ApiError(400, `user with email '${userData.email}' already exists`);
        }

        const result = await this.usersModel.insertUser(userData);

        return result;
    }
}
