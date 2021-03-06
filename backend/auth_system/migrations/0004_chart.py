# Generated by Django 4.0.5 on 2022-07-23 22:12

import auth_system.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth_system', '0003_alter_profile_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chartType', models.CharField(choices=[('L', 'Line'), ('B', 'B')], default='L', max_length=1)),
                ('options', models.JSONField(default=auth_system.models.Chart.default_options)),
                ('data', models.JSONField(default=auth_system.models.Chart.default_data)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
