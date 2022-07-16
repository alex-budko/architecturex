from rest_framework import generics
from django.shortcuts import get_object_or_404

from .serializers import ProfileSerializer
from .models import Profile
from .models import UserAccount

class ProfileCreateView(generics.CreateAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class ProfileRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    lookup_field = 'user'
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
