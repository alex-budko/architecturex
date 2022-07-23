from .views import ProfileCreateView, ProfileRetrieveUpdateView, ChartCreateView, ChartRetrieveUpdateView

from django.urls import path

urlpatterns = [
    path('profile/<slug:user>/', ProfileRetrieveUpdateView.as_view(), name='profile'),
    path('chart/<slug:id>/', ChartRetrieveUpdateView.as_view(), name='chart'),
    path('create/profile/', ProfileCreateView.as_view(), name='profile-create'),
    path('create/chart/', ChartCreateView.as_view(), name='chart-create'),
]

