from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

from .models import Profile, Chart

from rest_framework import serializers

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('name', 'email', 'password')

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        many=False,
        queryset = User.objects.all(),
        slug_field= ('name'),
    )

    class Meta:
        model = Profile
        fields = ('user', 'email', 'description', 'avatar')

class ChartSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        many=False,
        queryset = User.objects.all(),
        slug_field= ('name'),
    )

    class Meta:
        model = Chart
        fields = ('id', 'user', 'chartType', 'style', 'options', 'data')
