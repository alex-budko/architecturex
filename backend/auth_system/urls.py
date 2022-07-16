from .views import ProfileCreateView, ProfileRetrieveUpdateView

from django.urls import path

urlpatterns = [
    path('profile/<str:user>/', ProfileRetrieveUpdateView.as_view(), name='profile-create'),
    path('profile/create/', ProfileCreateView.as_view(), name='profile-create'),
]

