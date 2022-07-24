
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

class UserAccountManager(BaseUserManager):
    """
        Creates and saves a user with the given email, name, and password.
    """
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            name=name,
        )

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, name, password=None):
        """
        Creates and saves a superuser with the given email, name, and password.
        """
        user = self.create_user(
            email,
            password=password,
            name=name,
        )

        user.is_admin = True
        user.save()

        return user


class UserAccount(AbstractBaseUser):
    
    email = models.EmailField(
        verbose_name='email address',
        max_length=265,
        unique=True,
    )

    name = models.CharField(max_length=265, primary_key=True, unique=True, blank=False)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def has_perm(self):
        "Does the user have a specific permission?"
        return True

    def has_module_perms(self):
        "Does the user have permissions to view the app `app_label`?"
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin

    def get_full_name(self):
        return self.name
    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.email

class Profile(models.Model):

    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, primary_key=True)
    email = models.EmailField(
        verbose_name='email address',
        max_length=265,
        unique=True,
    )
    description = models.CharField(blank=True, default='Description', max_length=300)
    avatar = models.ImageField(blank=True, upload_to='avatars')
    

    def __str__(self):
        return self.user.email

class Chart(models.Model):
    LINE = 'L'
    BAR = 'B'
    CHART_TYPES = [
        (LINE, 'Line'),
        (BAR, 'Bar'),
    ]

    def default_options():
        return {"options": "none"}

    def default_data():
        return {"data": "none"}

    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    chartType = models.CharField(max_length=1, choices=CHART_TYPES, default=LINE)
    options = models.JSONField(default=default_options)
    data = models.JSONField(default=default_data)

    def __str__(self):
        return self.user.email


