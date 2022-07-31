from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def contact_message(req):
    data = req.data
    send_mail(
        'Architecturex Message from %s' % data['name'],
        data['message'],
        data['email'],
        ['alex.budko2017@gmail.com'],
        fail_silently=False,
    )
    return Response({'message': 'success'})
