from .views import ProfileCreateView, ProfileRetrieveUpdateView

from django.urls import path

urlpatterns = [
    path('profile/<slug:user>/', ProfileRetrieveUpdateView.as_view(), name='profile-create'),
    path('create/profile/', ProfileCreateView.as_view(), name='profile-create'),
]

