from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from products.views import ProductViewSet
from orders.views import OrderViewSet
from profiles.views import ProfileViewSet
from categories.views import CategoryViewSet
from authorization.views import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views

router = routers.DefaultRouter()
router.register('products', ProductViewSet)
router.register('profiles', ProfileViewSet)
router.register('orders', OrderViewSet)
router.register('categories', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', RegisterAPI.as_view()),
    path('auth/login', LoginAPI.as_view()),
    path('auth/user', UserAPI.as_view()),
    path('auth', include('knox.urls')),
    path('auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('admin/', admin.site.urls),
]

