from .views import ProfileCreateView, ProfileRetrieveView, ProfileUpdateView

from django.urls import path

urlpatterns = [
    path('profile/<int:pk>', ProfileRetrieveView.as_view(), name='profile-create'),
    path('profile/update/<int:pk>', ProfileUpdateView.as_view(), name='profile-create'),
    path('profile/create/', ProfileCreateView.as_view(), name='profile-create'),
]

