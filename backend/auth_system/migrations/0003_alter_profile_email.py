# Generated by Django 4.0.5 on 2022-07-18 21:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_system', '0002_profile_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='email',
            field=models.EmailField(max_length=265, unique=True, verbose_name='email address'),
        ),
    ]