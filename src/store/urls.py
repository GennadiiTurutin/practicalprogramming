from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.views.generic import TemplateView

from products.views import ProductViewSet
from profiles.views import ProfileViewSet
from categories.views import CategoryViewSet
from payments.views import PaymentViewSet
from authorization.views import RegisterAPI, LoginAPI, UserAPI, ChangeCredentialsView
from payments.views import PaymentView
from knox import views as knox_views
from django.conf.urls.static import static
from django.conf import settings


router = routers.DefaultRouter()
router.register('products', ProductViewSet)
router.register('profiles', ProfileViewSet)
router.register('categories', CategoryViewSet)
router.register('payments', PaymentViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('auth/register/', RegisterAPI.as_view()),
    path('auth/login', LoginAPI.as_view()),
    path('auth/user', UserAPI.as_view()),
    path('auth/users/', ChangeCredentialsView.as_view()),
    path('auth', include('knox.urls')),
    path('auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('admin/', admin.site.urls),
    path('payment/', PaymentView.as_view()),
    path('', TemplateView.as_view(template_name='index.html')),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
