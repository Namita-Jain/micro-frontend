export default function toastDirective(Toast) {
    return {
        restrict: 'E',
        templateUrl: 'src/modules/toast/toast.html',
        replace: true,
        controller: 'toastController',
    }
}
