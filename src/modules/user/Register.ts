import { Arg, Mutation, Query, Resolver } from "type-graphql";
import * as bcrypt from "bcryptjs";
import { User } from "src/entity/User";

@Resolver(User)
export class RegisterResolver {
	@Query(() => String!)
	async hello() {
		return "Hello World";
	}

	@Mutation(() => User!)
	async register(
		@Arg("firstName") firstName: string,
		@Arg("lastName") lastName: string,
		@Arg("email") email: string,
		@Arg("password") password: string
	): Promise<User> {
		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		}).save();

		return user;
	}
}
