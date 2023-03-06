from django.db import models
from django.utils.translation import gettext_lazy as _


class Services(models.TextChoices):
    REMOTE = 'REMOTE', _('Remote')
'''______________________________________________________________________________________'''

ENUM_MAP = {
    "remote": Services.REMOTE,
}
'''______________________________________________________________________________________'''


def is_valid_service(input_name: str) -> bool:
    """Check whether a service is a valid option."""
    return input_name.lower() in ENUM_MAP


def get_service(service_name: str) -> Services:
    """Return the service "value" depending on an input "key"."""
    return ENUM_MAP.get(service_name.lower(), None)

'''______________________________________________________________________________________'''