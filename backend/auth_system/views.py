from rest_framework import generics

from .serializers import ProfileSerializer
from .models import Profile

class ProfileCreateView(generics.CreateAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class ProfileRetrieveView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class ProfileUpdateView(generics.UpdateAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
