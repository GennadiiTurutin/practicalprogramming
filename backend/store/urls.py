from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from carts.views import CartViewSet
from products.views import ProductViewSet
from orders.views import OrderViewSet
from users.views import UserViewSet

router = routers.DefaultRouter()
router.register('products', ProductViewSet)
router.register('users', UserViewSet)
router.register('carts', CartViewSet)
router.register('orders', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
]
