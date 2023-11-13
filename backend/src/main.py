from loguru import logger


@logger.catch
def main():
    """Application entry point."""
    logger.info("Starting application.")
    raise NotImplementedError


if __name__ == "__main__":
    main()
