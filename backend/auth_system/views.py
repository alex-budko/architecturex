from rest_framework import generics

from .serializers import ProfileSerializer, ChartSerializer
from .models import Profile, Chart

class ProfileList(generics.ListAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class ProfileCreateView(generics.CreateAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class ProfileRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'user'
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class ChartCreateView(generics.CreateAPIView):
    serializer_class = ChartSerializer
    queryset = Chart.objects.all()

class ChartRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    serializer_class = ChartSerializer
    queryset = Chart.objects.all()

class ChartListView(generics.ListAPIView):
    serializer_class = ChartSerializer
    model=Chart
    def get_queryset(self):
        user = self.kwargs['user']
        queryset = self.model.objects.filter(user=user)
        return queryset

class AllChartListView(generics.ListAPIView):
    serializer_class = ChartSerializer
    queryset = Chart.objects.all()
