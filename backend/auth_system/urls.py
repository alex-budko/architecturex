from .views import ChartListView, ProfileCreateView, ChartCreateView, ProfileRetrieveUpdateDestroyView, ChartRetrieveUpdateDestroyView

from django.urls import path

urlpatterns = [
    path('profile/<slug:user>/', ProfileRetrieveUpdateDestroyView.as_view(), name='profile'),
    path('chart/<slug:id>/', ChartRetrieveUpdateDestroyView.as_view(), name='chart'),
    path('charts/<slug:user>/', ChartListView.as_view(), name='chart-list'),
    path('create/profile/', ProfileCreateView.as_view(), name='profile-create'),
    path('create/chart/', ChartCreateView.as_view(), name='chart-create'),
]

