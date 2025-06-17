import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import * as cookieParser from "cookie-parser"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder().setTitle("To do list API").setVersion("1.0").build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, documentFactory)

  app.enableCors({ origin: "http://localhost:3000", credentials: true })

  app.use(cookieParser([process.env.ACCESS_TOKEN_SECRET!, process.env.REFRESH_TOKEN_SECRET!]))

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.PORT!)
}
bootstrap()
