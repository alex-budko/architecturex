from .email_views import contact_message
from .views import ChartListView, AllChartListView, ProfileCreateView, ChartCreateView, ProfileList, ProfileRetrieveUpdateDestroyView, ChartRetrieveUpdateDestroyView

from django.urls import path

urlpatterns = [
    path('profiles/', ProfileList.as_view(), name='profile-list'),
    path('profile/<slug:user>/', ProfileRetrieveUpdateDestroyView.as_view(), name='profile'),
    path('chart/<slug:id>/', ChartRetrieveUpdateDestroyView.as_view(), name='chart'),
    path('charts/<slug:user>/', ChartListView.as_view(), name='chart-list'),
    path('charts/', AllChartListView.as_view(), name='chart-list'),
    path('create/profile/', ProfileCreateView.as_view(), name='profile-create'),
    path('create/chart/', ChartCreateView.as_view(), name='chart-create'),
    path('message/', contact_message, name='contact-message'),
]

