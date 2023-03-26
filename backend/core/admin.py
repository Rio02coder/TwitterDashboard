from django.contrib import admin
from core.models.user_model import User
from core.models.application_model import Application
# Register your models here.


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """Configuration of the admin interface for users."""
    list_display = [
        'pk', 'first_name', 'last_name', 'email', 'is_verified', 'twitter_name', 'flu_application', 'is_active', 'is_staff', 'is_superuser'
    ]


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    """Configuration of the admin interface for application."""
    list_display = [
        'pk', 'flu_application',
    ]
