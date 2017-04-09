from gpiozero import LED, Button
from signal import pause
import requests


def pressedClose(button):

    req = requests.post("http://34.209.46.58:5000/update?udid=d1&status=closed")
    print("sending msg to server")
    
    print(str(button.pin.number) + "won the game")


def pressedOpen(button):

    req = requests.post("http://34.209.46.58:5000/update?udid=d1&status=open")
    print("sending msg to server")
    
    print(str(button.pin.number) + "won the game")

#red close
led = LED(17)
button = Button(2)

button.when_pressed = pressedClose
button.when_released = led.off

#blue open
led1 = LED(27)
button1 = Button(3)

button1.when_pressed = pressedOpen
button1.when_released = led1.off


pause()