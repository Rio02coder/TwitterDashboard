# Generated by Django 4.1.7 on 2023-03-26 03:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_alter_user_flu_application_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='flu_application',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='Flu application+', to='core.application'),
        ),
    ]