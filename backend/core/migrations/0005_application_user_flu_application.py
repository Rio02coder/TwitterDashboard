# Generated by Django 4.1.7 on 2023-03-25 13:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_prediction_user_last_month_prediction_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('flu_application', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='flu_application',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='Flu application+', to='core.application'),
        ),
    ]
