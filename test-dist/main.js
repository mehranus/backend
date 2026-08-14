"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const PORT = process.env.PORT ?? 3000;
    await app.listen(PORT, () => {
        console.log(`server running in port : ${PORT}`);
    });
}
bootstrap();
