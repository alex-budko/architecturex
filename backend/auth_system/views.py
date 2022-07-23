from rest_framework import generics
from django.shortcuts import get_object_or_404

from .serializers import ProfileSerializer, ChartSerializer
from .models import Profile, Chart

class ProfileCreateView(generics.CreateAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class ProfileRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    lookup_field = 'user'
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class ChartCreateView(generics.CreateAPIView):
    serializer_class = ChartSerializer
    queryset = Chart.objects.all()

class ChartRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    lookup_field = 'id'
    serializer_class = ChartSerializer
    queryset = Chart.objects.all()