<?php


namespace Milestone\SmartKitchen\Logging;

use Monolog\Formatter\LineFormatter;

class LoggingFormatter
{
    public function __invoke($logger)
    {
        foreach ($logger->getHandlers() as $handler) {
            $handler->setFormatter(new LineFormatter(
                date("h:i:s A") . " :: %message%" . "\r\n"
            ));
        }
    }
}
