from rest_framework import viewsets
from .serializers import ProfileSerializer
from .models import Profile
from django.contrib.auth.models import User

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def patch(request, id, username, email, password):
	    user = User.objects.get(id=id)
	    user.username = username,
	    user.email = email,
	    user.password = password
	    user.save()
	    return Response({
	      "id": user.id,
	      "username": user.username,
	      "email": user.email,
	      "user": user.user,
	      "authenticated": True,
	      "products": user.user.products.values('id'),
	      "token": AuthToken.objects.create(user)[1]
	    })
