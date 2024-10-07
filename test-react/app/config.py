from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    environment: str = "dev"
    debug: bool = True

    class Config:
        env_file = ".env"

    def configure(self):
        if self.environment == "prod":
            self.debug = False
        else:
            self.debug = True


settings = Settings()
settings.configure()
