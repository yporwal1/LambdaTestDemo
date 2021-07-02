
/**
* this class contains all the reusable common methods and shared across all pageobjects
*/
export default class CommonFunction {
    /**
    * description
    */
    dragAndDrop = (element, x = 0, y = 0) => {
        const location = element.getLocation();
        console.log(location, parseInt(location.x, 10), parseInt(location.y, 10));
        browser.performActions([
          {
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'mouse' },
            actions: [
              { type: 'pointerMove', duration: 0, x: parseInt(location.x, 10), y: parseInt(location.y, 10) },
              { type: 'pointerDown', button: 0 },
              { type: 'pointerMove', duration: 0, x: parseInt(location.x, 10) + x, y: parseInt(location.y, 10) + y },
              { type: 'pointerUp', button: 0 },
            ],
          },
        ]);
      };
}