import { NestFactory }    from "@nestjs/core";
import { AppModule }      from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const config = new DocumentBuilder()
    .setTitle("Synapse ERP API Gateway")
    .setDescription("Public entry point for all micro‑services")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  SwaggerModule.setup("api", app, SwaggerModule.createDocument(app, config));

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 API Gateway on http://localhost:${port}`);
}
bootstrap();
