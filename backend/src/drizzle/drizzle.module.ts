import { Global, Module } from "@nestjs/common"
import { dbProvider } from "./drizzle.provider"

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DrizzleModule {}
