import { NestFactory }    from "@nestjs/core";
import { AppModule }      from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle("Synapse Audit Service")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  SwaggerModule.setup("api", app, SwaggerModule.createDocument(app, config));

  const port = process.env.PORT ?? 3009;
  await app.listen(port);
  console.log(`🚀 Audit Service on http://localhost:${port}`);
}
bootstrap();
