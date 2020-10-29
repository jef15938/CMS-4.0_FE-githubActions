export class ModalBase<R> {
  private modalRef: { close(returnValue?: R) };

  protected close(returnValue?: R) {
    this.modalRef.close(returnValue);
  }
}
