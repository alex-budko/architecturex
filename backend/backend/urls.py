from django.views.generic import TemplateView
from django.urls import path, include, re_path

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
