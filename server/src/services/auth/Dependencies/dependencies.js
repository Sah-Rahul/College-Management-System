import { AuthController } from "../controller/authController.js";
import MongoUserRepository from "../repository/UserRepository.js";
import { AuthService } from "../service/authServices.js";

class Container {
  static init() {
    const repositories = {
      userRepository: new MongoUserRepository(),  
    };

    const services = {
      authService: new AuthService(repositories.userRepository),
    };

    const controller = {
      authController: new AuthController(services.authService),
    };

    return {
      repositories,
      services,
      controller,
    };
  }
}

const initialized = Container.init();

export { Container };
export default initialized;